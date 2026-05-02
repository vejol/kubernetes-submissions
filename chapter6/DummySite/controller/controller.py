from string import Template

import kopf
import requests
import yaml
from kubernetes import client
from kubernetes.client.exceptions import ApiException


def get_html(website_url):
    headers = {"User-Agent": "DummySiteFetcher/1.0"}
    response = requests.get(website_url, headers=headers)
    response.raise_for_status()
    return response.text


def render_template(filename, **kwargs):
    with open(f"templates/{filename}") as f:
        template = Template(f.read())
    return yaml.safe_load(template.substitute(**kwargs))


def make_configmap(name, html):
    return {
        "apiVersion": "v1",
        "kind": "ConfigMap",
        "metadata": {"name": name},
        "data": {"index.html": html},
    }


def make_deployment(name):
    return render_template("deployment.yaml", name=name)


def make_service(name):
    return render_template("service.yaml", name=name)


def create_or_ignore(create_fn, *args):
    try:
        create_fn(*args)
    except ApiException as e:
        if e.status != 409:  # resource already exists, expected on kopf retry
            raise


def delete_or_ignore(delete_fn, *args):
    try:
        delete_fn(*args)
    except ApiException as e:
        if e.status != 404:  # resource already deleted, expected on kopf retry
            raise


@kopf.on.create("dummysites")
def create_fn(spec, name, namespace, logger, **kwargs):
    logger.info(f"Creating DummySite {name} for {spec['website_url']}")
    html = get_html(spec["website_url"])

    core_v1 = client.CoreV1Api()
    apps_v1 = client.AppsV1Api()

    # Create ConfigMap
    create_or_ignore(
        core_v1.create_namespaced_config_map, namespace, make_configmap(name, html)
    )

    # Create Deployment
    create_or_ignore(
        apps_v1.create_namespaced_deployment, namespace, make_deployment(name)
    )

    # Create Service
    create_or_ignore(core_v1.create_namespaced_service, namespace, make_service(name))

    logger.info(f"DummySite {name} created successfully")


@kopf.on.delete("dummysites")
def delete_fn(name, namespace, **kwargs):
    core_v1 = client.CoreV1Api()
    apps_v1 = client.AppsV1Api()

    delete_or_ignore(apps_v1.delete_namespaced_deployment, name, namespace)
    delete_or_ignore(core_v1.delete_namespaced_service, name, namespace)
    delete_or_ignore(core_v1.delete_namespaced_config_map, name, namespace)

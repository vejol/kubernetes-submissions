# DummySite Controller

This custom controller is used for managing DummySite custom resources.

It has made by using Python and [kopf](https://github.com/nolar/kopf).

## Local development

A virtual environment is used to keep the project's dependencies isolated from global packages.

### Setup Virtual Environment

1. **Create a virtual environment:**

   ```sh
   python3 -m venv .venv
   ```

2. **Activate the environment:**

   ```sh
   source .venv/bin/activate
   ```

3. **Install the dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

### Run Locally

```
kopf run controller.py --verbose --all-namespaces
```

# [LochlanMcIntosh.com](http://www.lochlanmcintosh.com/)

My personal website, written in Python with Django.

# Development

1. Make sure that python3, pip, and virtualenv are installed

1. Create a virtualenv

	```bash
    virtualenv --no-site-packages --python=$(which python3) env
    ```

1. Activate virtualenv

	```bash
	source env/bin/activate
    ```

1. Install requirements

	```bash
	pip install --requirement requirements.txt --upgrade
    ```

1. Run migrations

	```bash
	python manage.py migrate
    ```

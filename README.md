# [LochlanMcIntosh.com](http://www.lochlanmcintosh.com/)

My personal website, written in Python and JavaScript and deployed on [OpenShift](https://www.openshift.com/).

This repo also serves as a living example of what I think a reasonable modern web project might look like, represented by the stack I am partial towards and most experienced with.

This website is powered by:
- [Django](https://www.djangoproject.com/)
- [Backbone.js](http://backbonejs.org/)
- [Underscore.js](http://underscorejs.org/)
- [jQuery](http://jquery.com/)
- [Require.js](http://requirejs.org/)
- [Handlebars](http://handlebarsjs.com/)
- [Sass](http://sass-lang.com/)

And tested using:
- [Karma](http://karma-runner.github.io/)
- [Jasmine](http://jasmine.github.io/)

# Development

## Set Up and Run Django

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

1. Run server

    ```bash
    python manage.py runserver 0.0.0.0:8000
    ```

## Building and Testing the Front End

```bash
# "Dev" build: install all dependencies, lint, test, and compile from source:
make

# "Production" build: install production dependencies and compile from source:
env PRODUCTION=1 make

# To delete compiled files:
make clean

# To start over from scratch (also deleting vendor files, and `node_modules`):
make distclean
```

See [the Makefile](https://github.com/Lochlan/LochlanMcIntosh.com/blob/master/Makefile) for additional, more granular targets.  Using it requires:

- [GNU Make](http://www.gnu.org/software/make/), preferably 3.81 or better
- [Node.js](http://nodejs.org/) stable and [npm](https://www.npmjs.com/) to install and run most of the build dependencies
- [Ruby](https://www.ruby-lang.org/) and [Bundler](http://bundler.io/) to install and run Sass

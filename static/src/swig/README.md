Please note: before compiling swig templates into javascript, the makefile copies the contents of `templates/partials/static-pages` into here, replacing ".html" file extensions with ".swig".

Put another way, a Django template `templates/partials/static-pages/<template_name>.html` is accessible in Backbone via swig by including the `templates/<template_name>` AMD module.

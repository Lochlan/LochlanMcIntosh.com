Please note: before compiling handlebars into javascript, the makefile copies the contents of `templates/partials/static-pages` into here, replacing ".html" file extensions with ".hbs".

Put another way, a Django template `templates/partials/static-pages/<template_name>.html` is accessible in Backbone via Handlebars by including the `templates/<template_name>` AMD module.

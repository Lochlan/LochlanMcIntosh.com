Please note: before compiling swig templates into javascript, the makefile copies the contents of `templates/shared` into here, replacing ".html" file extensions with ".tpl".

Put another way, a Django template `templates/shared/<template_name>.html` is accessible in Backbone via swig by including the `templates/<template_name>` AMD module.

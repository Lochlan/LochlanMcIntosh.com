# [LochlanMcIntosh.com](http://www.lochlanmcintosh.com/)

[![Build Status](https://travis-ci.org/Lochlan/LochlanMcIntosh.com.png?branch=master)](https://travis-ci.org/Lochlan/LochlanMcIntosh.com)

My personal website, written in Python and JavaScript and deployed on [OpenShift](https://www.openshift.com/).

This repo also serves as a living example of what I think a reasonable modern web project might look like, represented by the stack I am partial towards and most experienced with.

This website is powered by:
- [Django](https://www.djangoproject.com/)
- [Backbone.js](http://backbonejs.org/)
- [Underscore.js](http://underscorejs.org/)
- [jQuery](http://jquery.com/)
- [Require.js](http://requirejs.org/)
- [Swig](http://paularmstrong.github.io/swig/)
- [Sass](http://sass-lang.com/)

And tested using:
- [Karma](http://karma-runner.github.io/)
- [Jasmine](http://jasmine.github.io/)

# Development

```bash
# Dev build: install all dependencies, lint, test, and compile
make

# Production build: install production dependencies and compile
env PRODUCTION=1 make

# Run the development webserver
make runserver

# Delete compiled files
make clean

# Start over from scratch and delete everything
make distclean
```

See [the Makefile](https://github.com/Lochlan/LochlanMcIntosh.com/blob/master/Makefile) for additional, more granular targets.  Using it requires:

- [GNU Make](http://www.gnu.org/software/make/), preferably 3.81 or better
- [Python 3](https://www.python.org/), [pip](https://pip.pypa.io/), and [virtualenv](https://virtualenv.pypa.io/)
- [Node.js](http://nodejs.org/) stable and [npm](https://www.npmjs.com/)
- [Ruby](https://www.ruby-lang.org/) and [Bundler](http://bundler.io/)

# Configuration

Environment variables:
- `MANDRILL_API_KEY` - Required for sending e-mails via Mandrill

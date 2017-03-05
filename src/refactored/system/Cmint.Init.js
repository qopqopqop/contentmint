Cmint.Util.runTests();

Cmint.Init = function() {

    // Get user data from textarea. The textarea is populated by whatever backend
    // the project happens to be using.
    Cmint.Instance.Data = JSON.parse($('#Data').text());

    // Fetch the template markup using a jquery ajax call. The callback will initiate the main
    // Vue instance.
    var template = Cmint.Instance.Data.template;
    $.get(Cmint.Instance.Templates[template].path, function(markup) {

        Cmint.App = new Vue({

            el: '#App',

            data: {

                // User Data for testing
                template: markup,
                templateName: Cmint.Instance.Data.template,
                username: Cmint.Instance.Data.username,
                contentName: Cmint.Instance.Data.contentName,
                customComponents: Cmint.Instance.Data.customComponents,
                
                // Contexts
                stage: Cmint.Instance.Data.saved,
                components: Cmint.AppFn.getTemplateComponents(template),

                // Global items used by other components
                activeComponent: null,
                fieldsComponent: null,
                componentList: null,
                selectedCategory: 'All',

                // Introspection
                contextualize: false,
                changes: 0,
                previous: null,
                saved: []
            
            },

            methods: {

                save: Cmint.AppFn.save,
                snapshot: Cmint.AppFn.snapshot,
                undo: Cmint.AppFn.undo

            },

            created: function() {
                Cmint.AppFn.mergeCustomComponents(this);
            },

            mounted: function() {
                var _this = this;
                this.$bus.$on('callComponentFields', function() {
                    _this.fieldsComponent = _this.activeComponent.config;
                })
                Cmint.Ui.documentHandler();
                Cmint.Ui.contextualize();
                Cmint.Bus.setSelectedCategory(this);
                Cmint.Drag.init();
                Cmint.Util.debug('mounted application');
            }

        })

    })

}
Cmint.Ui.documentHandler = function() {

    $(document).on({

        'click': function(e) {

            var $target = $(e.target);
            var isComponent = $target.closest(Cmint.Settings.class.component).length;
            var isInStage = $target.closest(Cmint.Settings.id.stage).length;
            var isActionBar = $target.closest(Cmint.Settings.id.actionbar).length;
            var categoryList = $target.closest(Cmint.Settings.class.categories).length;
            var fieldChoice = $target.closest(Cmint.Settings.class.fieldchoice).length;
            var dropdown = $target.closest(Cmint.Settings.class.dropdown).length; 

            if (isComponent && isInStage) {
                var component = $target.closest(Cmint.Settings.class.component);
                if (!component.hasClass('active')) {
                    $(Cmint.Settings.class.component + '.active').removeClass('active');
                    component.addClass('active');
                }
                // blur the previously focused editor instance
                $('.mce-edit-focus').each(function() {
                    if (!$(this).closest(Cmint.Settings.class.component).hasClass('active')) {
                        $(this).blur();
                    }
                })
                
            } else {
                $(Cmint.Settings.class.component + '.active').removeClass('active');
                if (!isActionBar && Cmint.App.activeComponent) {
                    Cmint.Util.debug('deactivated component "'+Cmint.App.activeComponent.config.name+'"');
                    Cmint.Bus.$emit('closeActionBar');
                }
            }

            if (!categoryList) { Cmint.Bus.$emit('closeCategoryList'); }

            if (!fieldChoice) { Cmint.Bus.$emit('closeFieldChoice'); }

            if (!dropdown) { Cmint.Bus.$emit('closeDropdown'); }

        }

    })

}
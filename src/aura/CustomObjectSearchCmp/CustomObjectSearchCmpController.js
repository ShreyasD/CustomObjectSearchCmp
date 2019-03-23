({
    onInit : function(component, event, helper) {
        helper.getFieldDefinitions(component, event);
    },

    search : function(component, event, helper) {
        var searchField = component.find('searchField');
        var isValueMissing = searchField.get('v.validity').valueMissing;
        // if value is missing show error message and focus on field
        if(isValueMissing) {
            searchField.showHelpMessageIfInvalid();
            searchField.focus();
        } else {
            // else call helper function
            helper.getSearch(component, event);
        }
    }
})
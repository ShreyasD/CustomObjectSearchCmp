({
    getFieldDefinitions : function(component, event) {
        // show spinner
        component.set("v.showSpinner" , true);
        var action = component.get("c.getColumnDefinitions");
        action.setParams({
            'objectApiName': component.get("v.objectName"),
            'fields': component.get("v.fields")
        });
        action.setCallback(this, function(response) {
            //hide spinner when response coming from server
            component.set("v.showSpinner" , false);
            var state = response.getState();
            if (state === "SUCCESS") {
                var columnDefinitions = response.getReturnValue();
                component.set("v.columns", columnDefinitions);
            } else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
            //hide spinner
            component.set("v.showSpinner", false);
        });
        $A.enqueueAction(action);
    },

    getSearch : function(component, event) {
        // show spinner
        component.set("v.showSpinner" , true);
        var action = component.get("c.getSearchList");
        action.setParams({
            'searchKeyWord': component.get("v.searchKeyword"),
            'objectApiName': component.get("v.objectName"),
            'fields': component.get("v.fields")
        });
        action.setCallback(this, function(response) {
            //hide spinner when response coming from server
            component.set("v.showSpinner" , false);
            var state = response.getState();
            if (state === "SUCCESS") {
                var searchResults = response.getReturnValue();
                console.log("searchResults: " + JSON.stringify(searchResults));
                // if storeResponse size is 0 ,display no record found message on screen.
                if (searchResults.length == 0) {
                    component.set("v.Message", true);
                } else {
                    component.set("v.Message", false);
                }
                // set searchResult list with return value from server.
                component.set("v.searchResult", searchResults);
            } else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
            //hide spinner
            component.set("v.showSpinner", false);
        });
        $A.enqueueAction(action);
    }
})
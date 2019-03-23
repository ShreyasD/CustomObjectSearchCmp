/**
 * Created by shreyasdhond1 on 2019-03-22.
 */

public with sharing class CustomObjectSearchCmpLtngCtrl {
    @AuraEnabled public static List<SObject> getSearchList(String searchKeyWord,
            String objectApiName, String fields) {

        String searchQuery = 'FIND \'' + searchKeyWord + '\' IN ALL FIELDS ' +
                'RETURNING ' + objectApiName + '(' + fields + ')';
        System.debug('searchQuery: ' + searchQuery);
        List<List<SObject>> results = Search.query(searchQuery);
        return results[0];
    }

    @AuraEnabled public static List<ColumnDefinition> getColumnDefinitions(String objectApiName, String fields) {
        System.debug('getColumnDefinitions: ' + objectApiName + ' ' + fields);
        List<String> fieldList = fields.replaceAll('\\s+', '').split(',');
        List<ColumnDefinition> columnDefinitions = new List<ColumnDefinition>();

        //Get Object API information
        Schema.DescribeSObjectResult objectDescribe = Schema.describeSObjects(new String[]{objectApiName}).get(0);

        //Get field API information from object field map
        Map<String, Schema.SObjectField> fieldMap = objectDescribe.fields.getMap();
        for(String field : fieldList) {
            if(fieldMap.containsKey(field)) {
                Schema.DescribeFieldResult fieldDescribe = fieldMap.get(field).getDescribe();
                ColumnDefinition cd = new ColumnDefinition(fieldDescribe.getLabel(), field,
                        String.valueOf(fieldDescribe.getType()));
                System.debug('cd: ' + cd);
                columnDefinitions.add(cd);
            }
        }

        return columnDefinitions;
    }

    public class ColumnDefinition {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String fieldName;
        @AuraEnabled
        public String type;

        public ColumnDefinition(String label, String fieldName, String type) {
            this.label = label;
            this.fieldName = fieldName;
            this.type = type;
        }
    }
}
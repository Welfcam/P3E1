public with sharing class AccountCasesController {

    @AuraEnabled
    public static List<Case> findCasesBySubject(String subjectSearchTerm, Id accountId) {
        return CaseSelector.getCasesByAccountIdAndSubject(subjectSearchTerm, accountId);
        //throw new AuraHandledException('Forced error');
    }
}
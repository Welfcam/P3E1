
//la méthode findCasesBySubject retourne le résultat de la méthode getCasesByAccountIdAndSubject de la classe CaseSelector
public with sharing class AccountCasesController {

    @AuraEnabled
    public static List<Case> findCasesBySubject(String subjectSearchTerm, Id accountId) {
        return CaseSelector.getCasesByAccountIdAndSubject(subjectSearchTerm, accountId);
        //throw new AuraHandledException('Forced error');
    }
}
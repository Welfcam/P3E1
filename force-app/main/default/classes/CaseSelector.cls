
//getCasesByAccountIdAndSubjet fait une requête SOQL et retourne les cas reliés au compte actif et comprenant les termes saisis par l'utilisateur
public with sharing class CaseSelector {
    public static List<Case> getCasesByAccountIdAndSubject(String subjectSearchTerm, Id accountId) {
        String searchTerm = '%' + subjectSearchTerm + '%';
        return [SELECT Subject, Status, Priority FROM Case WHERE (AccountId = :accountId AND Subject LIKE :searchTerm) ORDER BY Priority];
    }
}
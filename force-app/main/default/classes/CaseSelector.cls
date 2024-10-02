public with sharing class CaseSelector {
    public static List<Case> getCasesByAccountIdAndSubject(String subjectSearchTerm, Id accountId) {
        String searchTerm = '%' + subjectSearchTerm + '%';
        return [SELECT Subject, Status, Priority FROM Case WHERE (AccountId = :accountId AND Subject LIKE :searchTerm) ORDER BY Priority];
    }
}
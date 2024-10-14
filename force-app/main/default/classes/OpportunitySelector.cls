
//getOpportunitiesByAccountId fait une requête SOQL pour obtenir les opportunités (et leurs détails) reliées au compte actif
public with sharing class OpportunitySelector {
    public static List<Opportunity> getOpportunitiesByAccountId(Id accountId) {
        return [SELECT Id, Name, Amount, CloseDate, StageName FROM Opportunity WHERE AccountId = :accountId];
    }
}
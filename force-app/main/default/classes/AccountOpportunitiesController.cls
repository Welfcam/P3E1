//getOpportunities retourne les données de la méthode getOpportunitiesByAccountId de la classe OpportunitySelector
public with sharing class AccountOpportunitiesController {
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunities(Id accountId) {
        return OpportunitySelector.getOpportunitiesByAccountId(accountId);
        //throw new AuraHandledException('Forced error');
    }
}
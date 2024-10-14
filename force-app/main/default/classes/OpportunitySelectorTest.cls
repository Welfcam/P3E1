@IsTest
private class OpportunitySelectorTest {
    
    //Création de données de test : 1 compte
    @TestSetup
    static void setup() {
        Account testAccount = TestDataFactory.createTestAccount();
    }
    
    //Création de 3 opportunités liées au compte. La méthode getOpportunitiesByAccountId doit retourner 3 opportunités.
    @IsTest
    static void testGet3OpportunitiesByAccountId() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        TestDataFactory.createTestOpportunities(testAccount.Id, 3);
        Test.startTest();
        List<Opportunity> results = OpportunitySelector.getOpportunitiesByAccountId(testAccount.Id);
        Test.stopTest();
        Assert.areEqual(3, results.size(), 'Should return 3 opportunities');
    }

    //Création d'une opportunité lié au compte. La méthode getOpportunitiesByAccountId doit retourner 1 opportunité.
    @IsTest
    static void testGet1OpportunityByAccountId() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        TestDataFactory.createTestOpportunities(testAccount.Id, 1);
        Test.startTest();
        List<Opportunity> results = OpportunitySelector.getOpportunitiesByAccountId(testAccount.Id);
        Test.stopTest();
        Assert.areEqual(1, results.size(), 'Should return 1 opportunity');
    }

    //La méthode getOpportunitiesByAccountId ne retourne rien, car aucune opportunité n'est rattachée au compte
    @IsTest
    static void testNoOpportunities() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        List<Opportunity> results = OpportunitySelector.getOpportunitiesByAccountId(testAccount.Id);
        Test.stopTest();
        Assert.areEqual(0, results.size(), 'Should return no opportunities');
    }
}
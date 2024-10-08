@IsTest
private class AccountCasesControllerTest {

    //Création de données de test : 1 compte avec 3 opportunités 
    @TestSetup
    static void setup() {
        Account testAccount = TestDataFactory.createTestAccount();
        TestDataFactory.createTestCases(testAccount.Id, 3);
    }
    
    //Test de la méthode findCasesBySubject avec une chaîne de 2 termes valides (ici Test Case)
    //3 cas sont retournés (Test Case 0, Test Case 1 et Test Case 2)
    @IsTest
    static void valid2Terms() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject('Test Case', testAccount.Id);
        Test.stopTest();
        Assert.areEqual(3, results.size(), 'Should return 3 cases');
    }

    //Test de la méthode findCasesBySubject avec un seul terme valide (ici 2)
    //1 seul cas est retourné (Test Case 2) 
    @IsTest
    static void valid1Term() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject('2', testAccount.Id);
        Test.stopTest();
        Assert.areEqual(1, results.size(), 'Should return 1 case');
    }

    //Test de la méthode findCasesBySubject avec une chaîne invalide de termes (ici Test Case 4)
    //Aucun cas n'est retourné
    @IsTest
    static void invalidTerm() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject('Test Case 4', testAccount.Id);
        Test.stopTest();
        Assert.areEqual(0, results.size(), 'Should return no cases');
    }

}
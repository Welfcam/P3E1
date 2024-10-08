@IsTest
public class TestDataFactory {
    //Permet de créer un compte de test
    public static Account createTestAccount() {
        Account acc = new Account(Name='Test Account');
        insert acc;
        return acc;
    }

    //Permet de créer 1 ou plusieurs opportunités test
    public static List<Opportunity> createTestOpportunities(Id accountId, Integer numberOfOpp) {
        List<Opportunity> oppList = new List<Opportunity>();
        for(Integer i=0; i<numberOfOpp; i++) {
            oppList.add(new Opportunity(
                Name='Test Opportunity ' + i,
                StageName='Prospecting',
                CloseDate=System.today().addDays(30),
                Amount=10000,
                AccountId=accountId
            ));
        }
        insert oppList;
        return oppList;
    }

    //Permet de créer 1 ou plusieurs cas test
    public static List<Case> createTestCases(Id accountId, Integer numberOfCases) {
        List<Case> caseList = new List<Case>();
        for(Integer i=0; i<numberOfCases; i++) {
            caseList.add(new Case(
                Subject='Test Case ' + i,
                Status='New',
                Priority='High',
                AccountId=accountId
            ));
        }
        insert caseList;
        return caseList;
    }
}
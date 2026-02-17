Feature: Ecommerce vaidations

  @Validation
  Scenario Outline: Scenario Outline name: Placing order
    Given a login to Ecommerce2 app with "<username>" and "<password>"
    Then Verify Error message is displayed
    
  Examples:
    | username        | password  |   
    | rahulshetty     | learning  |
    | rahulshetty     | test123   |
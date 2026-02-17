Feature: Ecommerce vaidations

  @Regression
  Scenario: Placing order
    Given a login to Ecommerce app with "shisv@gmail.com" and "@Test123"
    When add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in cart
    When enter valid details and place order
    Then verify order is present in order history

  @Validation
  Scenario Outline: Scenario Outline name: Placing order
    Given a login to Ecommerce2 app with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username    | password |
      | rahulshetty | learning |
      | rahulshetty | test123  |
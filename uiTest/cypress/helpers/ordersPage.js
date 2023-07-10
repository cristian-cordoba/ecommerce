/// <reference types="cypress" />

class OrdersPage{
    elements = {
        title: () => cy.get('#maincontent h1'),

        orderIdLbl: () => cy.get('.id label'),
        orderIdInput: () => cy.get('.id input'),
        orderIdErrorMsg: () => cy.get('#oar-order-id-error'),

        billingLastNameLbl: () => cy.get('.lastname label'),
        billingLastNameInput: () => cy.get('.lastname input'),
        billingLastNameErrorMsg: () => cy.get('#oar-billing-lastname-error'),

        findOrderByLbl: () => cy.get('.find label'),
        findOrderBySelect: () => cy.get('.find select'),

        emailLbl: () => cy.get('#oar-email  label'),
        emailInput: () => cy.get('#oar-email input'),
        emailRequiredErrorMsg: () => cy.get('#oar_email-error'),

        billingZipCodeLbl: () => cy.get('#oar-zip label'),
        billingZipCodeInput: () => cy.get('#oar-zip input'),
        billingZipCodeErrorMsg: () => cy.get('#oar_zip-error'),

        continueBtn: () => cy.get('#maincontent button'),

        incorrectDataMsg: () => cy.get('div[role="alert"]'),


    }

    verifyLayout(){
        this.elements.title().should('be.visible').invoke('text').should('contain', 'Orders and Returns');
        this.elements.orderIdLbl().should('be.visible');
        this.elements.orderIdInput().should('be.visible');
        this.elements.billingLastNameLbl().should('be.visible');
        this.elements.billingLastNameInput().should('be.visible');
        this.elements.findOrderByLbl().should('be.visible');
        this.elements.findOrderBySelect().should('be.visible');
        this.elements.emailLbl().should('be.visible');
        this.elements.emailInput().should('be.visible');
        this.elements.billingZipCodeLbl().should('not.be.visible');
        this.elements.billingZipCodeInput().should('not.be.visible');
        this.elements.continueBtn().should('be.visible');
    }

    verifyOrderIdIsRequired(){
        this.elements.orderIdInput().should('have.class', 'mage-error');
        this.elements.orderIdErrorMsg().should('be.visible')
                                       .should('have.text', 'This is a required field.')
    }

    verifyBillingLastNameIsRequired(){
        this.elements.billingLastNameInput().should('have.class', 'mage-error');
        this.elements.billingLastNameErrorMsg().should('be.visible')
                                               .should('have.text', 'This is a required field.')
    }

    verifyEmailIsRequired(){
        this.elements.emailInput().should('have.class', 'mage-error');
        this.elements.emailRequiredErrorMsg().should('be.visible')
                                             .should('have.text', 'This is a required field.')

    }

    verifyBillingZipCodeIsRequired(){
        this.elements.billingZipCodeInput().should('have.class', 'mage-error');
        this.elements.billingZipCodeErrorMsg().should('be.visible')
                                              .should('have.text', 'This is a required field.')

    }

    verifyEmailFormat(){
        this.elements.emailInput().should('have.class', 'mage-error');
        this.elements.emailRequiredErrorMsg().should('be.visible')
                                             .should('have.text', 'Please enter a valid email address (Ex: johndoe@domain.com).')

    }

    verifyIncorrectDataMsg(){
        this.elements.incorrectDataMsg().should('be.visible')
                                        .should('contain.text', 'You entered incorrect data. Please try again.')
    }

    verifyOrderFounded(){
        cy.url().should('eq', 'https://magento.softwaretestingboard.com/sales/guest/view/')
    }

    clickOnContinue(){
        this.elements.continueBtn().click();
        return this
    }

    insertOrderId(orderId){
        this.elements.orderIdInput().click().clear().type(orderId);
        return this;
    }

    insertBillingLastName(name){
        this.elements.billingLastNameInput().click().clear().type(name);
        return this;
    }

    insertEmail(email){
        this.elements.emailInput().focus().clear().type(email);
        return this;
    }

    insertZipCode(zip){
        this.elements.billingZipCodeInput().focus().clear().type(zip);
        return this;
    }

    selectZipCodeOption(){
        this.elements.findOrderBySelect().select('ZIP Code')
        this.elements.emailLbl().should('not.be.visible');
        this.elements.emailInput().should('not.be.visible');
        this.elements.billingZipCodeLbl().should('be.visible');
        this.elements.billingZipCodeInput().should('be.visible');
    }

}

module.exports = new OrdersPage()
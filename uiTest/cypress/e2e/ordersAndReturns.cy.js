/// <reference types="cypress" />

const ordersPage = require("../helpers/ordersPage.js");
const orderId = '000017200'
const lastName = 'Cordoba'
const email = 'cmcordoba165@gmail.com'
const zipCode = '90210'
const invalidEmail = 'cmcordoba'
const incorrectOrderId = '123'
const incorrectLastName = 'InvalidName'
const incorrectEmail = 'email@email.com'
const incorrectZipCode = '12345'

describe('Search functionality', () => {

  beforeEach(() => {
    cy.intercept('**/content.html').as('pageLoad')
    cy.visit('https://magento.softwaretestingboard.com/sales/guest/form/')
    cy.wait('@pageLoad')
  });

  it('Orders and Return layout', () => {
    ordersPage.verifyLayout();
  })

  it('Order ID is a required field', () => {
    ordersPage.insertBillingLastName(lastName);
    ordersPage.insertEmail(email);
    ordersPage.clickOnContinue();
    ordersPage.verifyOrderIdIsRequired();
  })

  it('Billing Last Name is a required field', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertEmail(email);
    ordersPage.clickOnContinue();
    ordersPage.verifyBillingLastNameIsRequired();
  })

  it('Email is a required field', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.clickOnContinue();
    ordersPage.verifyEmailIsRequired();
  })
  
  it('Zip Code is a required field', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.selectZipCodeOption();
    ordersPage.clickOnContinue();
    ordersPage.verifyBillingZipCodeIsRequired();
  })

  it('Multiple fields are required', () => {
    ordersPage.clickOnContinue();
    ordersPage.verifyOrderIdIsRequired();
    ordersPage.verifyBillingLastNameIsRequired();
    ordersPage.verifyEmailIsRequired();
  })

  it('Email valid format', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertEmail(invalidEmail);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.clickOnContinue();
    ordersPage.verifyEmailFormat();
  })

  it('Incorrect Order ID', () => {
    ordersPage.insertOrderId(incorrectOrderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.insertEmail(email);
    ordersPage.clickOnContinue();
    ordersPage.verifyIncorrectDataMsg();
  })

  it('Incorrect Billing Last Name', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(incorrectLastName);
    ordersPage.insertEmail(email);
    ordersPage.clickOnContinue();
    ordersPage.verifyIncorrectDataMsg();
  })
  
  it('Incorrect Email', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.insertEmail(incorrectEmail);
    ordersPage.clickOnContinue();
    ordersPage.verifyIncorrectDataMsg();
  })
  
  it('Incorrect Zip Code', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.selectZipCodeOption();
    ordersPage.insertZipCode(incorrectZipCode)
    ordersPage.clickOnContinue();
    ordersPage.verifyIncorrectDataMsg();
  })

  it('Order found using email', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.insertEmail(email);
    ordersPage.clickOnContinue();
    ordersPage.verifyOrderFounded();
  })

  it('Order found using zip code', () => {
    ordersPage.insertOrderId(orderId);
    ordersPage.insertBillingLastName(lastName);
    ordersPage.selectZipCodeOption();
    ordersPage.insertZipCode(zipCode)
    ordersPage.clickOnContinue();
    ordersPage.verifyOrderFounded();
  })

})
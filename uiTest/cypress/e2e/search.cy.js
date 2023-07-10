/// <reference types="cypress" />

const searchPage = require("../helpers/searchPage.js")

describe('Search functionality', () => {

  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/')
  });

  it('Search a valid item', () => {
    searchPage.searchItems('shoes')
    searchPage.verifyDescriptionResultsMatchWithSearch('shoes')
  })

  it('Search an invalid item', () => {
    searchPage.searchItems('safsdfasdf')
    searchPage.verifyNoResultsMsg()
  })

  it('Search multiple valid words', () => {
    searchPage.searchItems('olivia shoes')
    searchPage.verifyDescriptionResultsMatchWithSearch('olivia shoes')
  })
})
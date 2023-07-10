/// <reference types="cypress" />

class SearchPage{
    elements = {
        searhInput: () => cy.get('#search'),
        noResultsMsg: () => cy.get('.message.notice'),
        resultList: () => cy.get('ol.products.list.items.product-items'),
        nextPage: () => cy.get('div.pages ul li.pages-item-next'),
        selectItem:() => cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo'),
        addToCart:() => cy.get('#product-addtocart-button'),
        cartCountNumber:() => cy.get('.counter-number')
    }

    searchItems(item){
        this.elements.searhInput().clear().type(item+'{enter}');
        return this;
    }

    verifyNoResultsMsg(){
        this.elements.noResultsMsg().should('be.visible')
        .invoke('text').should('contain', 'Your search returned no results.')
    }

    verifyDescriptionResultsMatchWithSearch(text){
        const textArr = text.split(" ");
        var textFound;
        this.elements.resultList().find('a.product-item-link').each(($itemDescription) => {
            textFound = false;
            textArr.forEach(word => {
                if( $itemDescription.text().toLowerCase().includes(word.toLowerCase()) )
                    return textFound = true;
            });
            expect(textFound).to.be.true;
        })
    }

    clickAddToCart(){
        this.elements.selectItem().click();
        cy.wait(5000);
        this.elements.addToCart().click();
        this.elements.cartCountNumber().invoke('text').should('contain', '1')


    }
}

module.exports = new SearchPage()
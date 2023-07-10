
cy.get('.123').should('exist')

var element = '.123';
cy.get('body').then((body)=>{
    if( body.find(element).length > 0) 
        console.log('element exists');

})
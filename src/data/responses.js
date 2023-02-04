const responses = [{
    status: 404,
    application: {
        id: 541158,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Not enough!',
            messages: [
                { subtitle: 'Documents of certifications couldn not able to find', text: 'Please resend your certification' },
                { subtitle: 'Cargo is not valid', text: 'Could not verify your product and denied permission' },
                { subtitle: 'Shipping Address', text: 'Given shipping address is not available in your country' }
            ]
        },
        comment: {
            title: 'Contact with our administration',
            text: 'Please contact with our administration to get further information about why we can"t verify your document and your product.'
        }
    }
}, {
    status: 200,
    application: {
        id: 23490,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Your Submission has successfully has been applied',
            messages: [{ subtitle: 'Application Succeed', text: 'Please jump to the In Processing Contracts page to get your application'}]
        },
        comment: {
            title: 'Your application response',
            text: 'We have checked and verified your documents and certification, if you have any other question or provide another documents please contact our administration again. Thank you!'
        }
    }
}, {
    status: 500,
    application: {
        id: 345346,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Your request has been reviewed and in process',
            messages: [{ subtitle: 'Application In process', text: 'Please be patient and wait till you get a response from us.'}]
        },
        comment: {
            title: 'Check your Email Address',
            text: 'We have send an email about your currently request. Please read the letter to get further information'
        }
    }
}, {
    status: 499,
    application: {
        id: 345802,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Не хватает документов',
            messages: [
                { subtitle: 'Причина отклюнения заявки', text: 'Не хватает документов'},
                { subtitle: 'Причина отклюнения заявки', text: 'Не отгрузочных документов'}
            ]
        },
        comment: {
            title: 'Комментарий к заявки',
            text: 'Товариши! Укрепления и развитие структуры позваляет выполънатъ важные задания по разработке новых предложений'
        }
    }
}];

const waitingResponses = [{
    status: 505,
    application: {
        id: 541158,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Not enough!',
            messages: [
                { subtitle: 'Documents of certifications couldn not able to find', text: 'Please resend your certification' },
                { subtitle: 'Cargo is not valid', text: 'Could not verify your product and denied permission' },
                { subtitle: 'Shipping Address', text: 'Given shipping address is not available in your country' }
            ]
        },
        comment: {
            title: 'Contact with our administration',
            text: 'Please contact with our administration to get further information about why we can"t verify your document and your product.'
        }
    }
}, {
    status: 505,
    application: {
        id: 23490,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Your Submission has successfully has been applied',
            messages: [{ subtitle: 'Application Succeed', text: 'Please jump to the In Processing Contracts page to get your application'}]
        },
        comment: {
            title: 'Your application response',
            text: 'We have checked and verified your documents and certification, if you have any other question or provide another documents please contact our administration again. Thank you!'
        }
    }
}, {
    status: 505,
    application: {
        id: 345346,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Your request has been reviewed and in process',
            messages: [{ subtitle: 'Application In process', text: 'Please be patient and wait till you get a response from us.'}]
        },
        comment: {
            title: 'Check your Email Address',
            text: 'We have send an email about your currently request. Please read the letter to get further information'
        }
    }
}, {
    status: 505,
    application: {
        id: 345802,
        date: 'от 15 октября 2022 г в. 16:56',
        message: {
            title: 'Не хватает документов',
            messages: [
                { subtitle: 'Причина отклюнения заявки', text: 'Не хватает документов'},
                { subtitle: 'Причина отклюнения заявки', text: 'Не отгрузочных документов'}
            ]
        },
        comment: {
            title: 'Комментарий к заявки',
            text: 'Товариши! Укрепления и развитие структуры позваляет выполънатъ важные задания по разработке новых предложений'
        }
    }
}];

const comment = "I've resend and uploaded all of the documents and other necessarily things that you have mentioned in your previously respond as comment message. I hope you will review my submission again and there is a chance to get the new certification. Chat Soon, Natali Ivanovna.";

export { responses, waitingResponses, comment };

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    
    // Tabs
    
    const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(event => {
            event.classList.add('hide');
            event.classList.remove('show', 'fade');
        });
        tabs.forEach((tab) => {
            tab.classList.remove(activeClass);
        });
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
}

// module.exports = tabs;

export default tabs; // new standard
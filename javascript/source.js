var pageList = () => `
    <h1>page list (javascript)</h1>
    <ul class="anchor-list">
      <li class="anchor" data-href='./page1.html'>
        page1
      </li>
      <li class="anchor" data-href='./page2.html'>
        page2
      </li>
      <li class="anchor" data-href='./page3.html'>
        page3
      </li>
    </ul>
  `
  var page = (name) => `
    <h1>${name}</h1>
    <span class="to-list" data-href="/javascript">back to list</span>
  `

  document.body.addEventListener('DOMSubtreeModified', () => {
    var anchors = document.querySelector('.anchor-list');

    if (anchors) {
      Array.from(anchors.children).forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          var url = e.target.dataset.href;
          var pageName = e.target.innerText;
          var pageTitle = `[javascript] ${pageName}`;

          history.pushState({
            title: pageTitle,
            html: page(pageName),
          }, '', url);
          document.title = pageTitle;
          document.body.innerHTML = page(pageName);


        })
      })
    }

    var anchor = document.querySelector('.to-list');

    if (anchor) {
      anchor.addEventListener('click', (e) => {
        var url = e.target.dataset.href;
        var pageTitle = '[javascript] page list';

        history.pushState({
          title: pageTitle,
          html: pageList(),
        }, '', url);
        document.title = pageTitle;
        document.body.innerHTML = pageList();
      });
    }
  })

  document.body.innerHTML = pageList();

  window.onpopstate = (e) => {
    document.title = e.state.title;
    document.body.innerHTML = e.state.html;
  };
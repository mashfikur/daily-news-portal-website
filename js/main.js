const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );

  const data = await res.json();

  const news_cat = data.data.news_category;

  const category_container = document.getElementById("category-container");

  news_cat.forEach((newsCategory) => {
    const li = document.createElement("li");

    li.innerText = newsCategory.category_name;
    li.setAttribute("onclick", `handleSearch('${newsCategory.category_id}')`);

    category_container.appendChild(li);
  });
};

loadCategory();

const handleSearch = async (searchId='08') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${searchId}`
  );

  const data = await res.json();

  const newsArr = data.data;

  // newsArr.forEach((news)=>{
  //     console.log(news.title)
  // })

  showNewsCard(newsArr);
};

handleSearch();

const showNewsCard = (newsArr) => {
  const cards_container = document.getElementById("cards-container");
  console.log(newsArr[0]);

  cards_container.innerHTML=``

  newsArr.forEach((news) => {
    const div = document.createElement("div");

    div.classList =
      "max-w-md bg-white border border-gray-200 rounded-lg shadow";

    div.innerHTML = `
          <a >
            <img
              class="rounded-t-lg"
              src="${news.image_url}"
              alt=""
            />
          </a>
          <div class="p-5">
            <a >
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
              >
                ${news.title}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 ">
            ${news.details.slice(0, 70)} ...
            </p>
            <a
              
              class="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  "
            >
              Read more
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        
        
        `;

    cards_container.appendChild(div);
  });
};
function getPagePublicationDate(page) {
  return page.data.publicationDate;
}

function groupByPublicationYear(pages) {
  const pagesByYear = new Map();

  for (const page of pages) {
    const year = getPagePublicationDate(page).getFullYear();
    const sameYearPages = pagesByYear.get(year);

    pagesByYear.set(year, (sameYearPages || []).concat(page));
  }

  const sortedYears = Array.from(pagesByYear.entries()).sort(
    ([yearA], [yearB]) => yearB - yearA,
  );

  sortedYears.forEach(([, pages]) => {
    pages.sort((a, b) => getPagePublicationDate(b) - getPagePublicationDate(a));
  });

  return sortedYears;
}

module.exports = { groupByPublicationYear };

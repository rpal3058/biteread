const DUMMY_BLOGS = [
  {
    id: "1",
    title: "10 Tips for a Successful Gardening Season",
    description:
      "Get your garden off to a great start with these helpful tips.",
    category: "Gardening",
    featured: true,
    image: "Gardening.jpg",
  },
  {
    id: "2",
    title: "The Best Hikes in the Pacific Northwest",
    description: "Discover some of the most breathtaking trails in the PNW.",
    category: "Hiking",
    featured: true,
    image: "Hiking.jpg",
  },
  {
    id: "3",
    title: "5 Delicious Plant-Based Recipes to Try",
    description: "Meatless meals that are easy to make and packed with flavor.",
    category: "Cooking",
    featured: true,
    image: "Cooking.jpg",
  },
  {
    id: "4",
    title: "How to Create a Sustainable Home",
    description: "Simple steps you can take to reduce your carbon footprint.",
    category: "Sustainability",
    featured: false,
    image: "Sustainability.jpeg",
  },
  {
    id: "5",
    title: "The Benefits of Meditation for Stress Relief",
    description:
      "Learn how meditation can help you manage stress and improve your overall well-being.",
    category: "Wellness",
    featured: true,
    image: "Wellness.jpeg",
  },
];
export function getFeaturedBlogs() {
  return DUMMY_BLOGS.filter((event) => event.featured);
}

export function getAllBlogs() {
  return DUMMY_BLOGS;
}

export function getFilteredBlogs(dateFilter) {
  const { year, month } = dateFilter;

  let filteredBlogs = DUMMY_BLOGS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredBlogs;
}

export function getBlogsById(id) {
  return DUMMY_BLOGS.find((event) => event.id === id);
}

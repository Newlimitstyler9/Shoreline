import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", selectedCategory || undefined]
  });

  const categories = [
    "All Posts",
    "Market Updates",
    "Buying Tips", 
    "Selling Tips",
    "Neighborhood Guides"
  ];

  const handleCategoryClick = (category: string) => {
    const categoryValue = category === "All Posts" ? "" : category;
    setSelectedCategory(categoryValue);
    trackEvent('blog_category_filter', 'engagement', category);
  };

  const handlePostClick = (postSlug: string, postTitle: string) => {
    trackEvent('blog_post_click', 'engagement', postTitle);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Market Updates": "bg-soft-blue text-white",
      "Buying Tips": "bg-green-500 text-white",
      "Selling Tips": "bg-orange-500 text-white",
      "Neighborhood Guides": "bg-purple-500 text-white"
    };
    return colors[category] || "bg-gray-500 text-white";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32">
        <div className="container-width">
          <div className="text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              Real Estate Insights & Market Updates
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto">
              Stay informed with the latest market trends, expert advice, and insider knowledge 
              about St. Petersburg real estate from our experienced team.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container-width">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === (category === "All Posts" ? "" : category) ? "default" : "outline"}
                className={`${
                  selectedCategory === (category === "All Posts" ? "" : category)
                    ? "bg-soft-blue text-white hover:bg-ocean-blue"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogPosts && blogPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {blogPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-gray mb-6">Featured Article</h2>
                  <Card className="border-0 shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative">
                        {blogPosts[0].featuredImage && (
                          <img 
                            src={blogPosts[0].featuredImage} 
                            alt={blogPosts[0].title}
                            className="w-full h-64 lg:h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r"></div>
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge className={getCategoryColor(blogPosts[0].category)}>
                            {blogPosts[0].category}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(blogPosts[0].publishedAt!)}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-gray mb-4">
                          {blogPosts[0].title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {blogPosts[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-sm">
                            <User className="w-4 h-4 mr-2" />
                            {blogPosts[0].author}
                          </div>
                          <Link href={`/blog/${blogPosts[0].slug}`}>
                            <Button 
                              className="bg-soft-blue text-white hover:bg-ocean-blue"
                              onClick={() => handlePostClick(blogPosts[0].slug, blogPosts[0].title)}
                            >
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              )}

              {/* Recent Posts Grid */}
              {blogPosts.length > 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-gray mb-6">Recent Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post) => (
                      <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        {post.featuredImage && (
                          <div className="relative">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className={getCategoryColor(post.category)}>
                                {post.category}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <CardContent className="p-6">
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(post.publishedAt!)}
                          </div>
                          <h3 className="text-xl font-semibold text-slate-gray mb-3 hover:text-soft-blue transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-sm">
                              <User className="w-4 h-4 mr-2" />
                              {post.author}
                            </div>
                            <Link 
                              href={`/blog/${post.slug}`} 
                              className="text-soft-blue font-medium hover:underline"
                              onClick={() => handlePostClick(post.slug, post.title)}
                            >
                              Read More →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Articles Found</h3>
              <p className="text-gray-500 mb-6">
                Try selecting a different category or check back later for new content.
              </p>
              <Button onClick={() => setSelectedCategory("")} className="bg-soft-blue text-white hover:bg-ocean-blue">
                View All Posts
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <div className="text-center text-white">
            <h2 className="text-responsive-lg font-bold mb-6">Stay Updated with Market Insights</h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Get the latest real estate trends, market updates, and expert advice delivered directly to your inbox.
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
              >
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

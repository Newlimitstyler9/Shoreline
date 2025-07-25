import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug
  });

  const { data: recentPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-width py-8">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-width py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-gray mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <Button className="bg-soft-blue text-white hover:bg-ocean-blue">
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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

  const handleShare = (platform: string) => {
    trackEvent('blog_share', 'engagement', platform, post.id);
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Article Header */}
      <article className="section-padding">
        <div className="container-width">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 text-soft-blue hover:text-ocean-blue">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Badge className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.publishedAt!)}
              </div>
              <div className="flex items-center text-gray-500">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-gray mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b">
              <span className="text-gray-600 font-medium">Share:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="text-blue-400 border-blue-400 hover:bg-blue-50"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="text-blue-700 border-blue-700 hover:bg-blue-50"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
            
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="bg-beige rounded-xl p-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-gray mb-2">{post.author}</h3>
                  <p className="text-gray-600 mb-4">
                    Our experienced real estate team brings years of local market knowledge and 
                    expertise to help you make informed decisions about buying, selling, or investing 
                    in St. Petersburg real estate.
                  </p>
                  <Link href="/contact">
                    <Button className="bg-soft-blue text-white hover:bg-ocean-blue">
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      {/* Related Articles */}
      {recentPosts && recentPosts.length > 1 && (
        <section className="section-padding bg-beige">
          <div className="container-width">
            <h2 className="text-2xl font-bold text-slate-gray mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts
                .filter(relatedPost => relatedPost.id !== post.id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {relatedPost.featuredImage && (
                      <img 
                        src={relatedPost.featuredImage} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <Badge className={getCategoryColor(relatedPost.category)} variant="secondary">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-slate-gray mt-3 mb-2 hover:text-soft-blue transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {relatedPost.excerpt.substring(0, 120)}...
                      </p>
                      <Link 
                        href={`/blog/${relatedPost.slug}`} 
                        className="text-soft-blue font-medium hover:underline text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <div className="text-center text-white">
            <h2 className="text-responsive-lg font-bold mb-6">Ready to Make Your Move?</h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Get personalized advice and expert guidance for your real estate journey in St. Petersburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                >
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/properties">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                >
                  Search Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

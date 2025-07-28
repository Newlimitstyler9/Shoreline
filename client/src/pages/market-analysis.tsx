import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  Clock,
  MapPin,
  BarChart3,
  PieChart,
  Calendar,
  Users,
  Building2,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Download,
  Share2,
  Phone,
  Mail,
  FileText,
  Award,
  Target,
  Zap,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { trackEvent, trackContact } from '@/lib/analytics';
import { Link } from 'wouter';

export default function MarketAnalysis() {
  const handleContactClick = () => {
    trackContact('click', 'market_analysis');
  };

  const handleDownloadReport = () => {
    trackEvent('engagement', 'download', 'market_report');
  };

  // Mock market data - in a real app, this would come from an API
  const marketData = {
    currentMonth: {
      medianPrice: 425000,
      avgDaysOnMarket: 28,
      inventoryCount: 1247,
      newListings: 342,
      soldProperties: 298,
      priceChange: 2.4,
      daysChange: -5,
      inventoryChange: -12
    },
    trends: {
      priceTrend: 'up',
      inventoryTrend: 'down',
      demandTrend: 'up'
    }
  };

  const neighborhoodData = [
    {
      name: "Downtown St. Petersburg",
      medianPrice: 485000,
      priceChange: 3.2,
      avgDaysOnMarket: 22,
      inventory: 156,
      demand: "High"
    },
    {
      name: "Historic Kenwood",
      medianPrice: 395000,
      priceChange: 1.8,
      avgDaysOnMarket: 31,
      inventory: 89,
      demand: "Medium"
    },
    {
      name: "Old Northeast",
      medianPrice: 675000,
      priceChange: 4.1,
      avgDaysOnMarket: 18,
      inventory: 67,
      demand: "High"
    },
    {
      name: "Snell Isle",
      medianPrice: 1250000,
      priceChange: 2.9,
      avgDaysOnMarket: 45,
      inventory: 23,
      demand: "Medium"
    },
    {
      name: "Crescent Heights",
      medianPrice: 325000,
      priceChange: 1.5,
      avgDaysOnMarket: 35,
      inventory: 134,
      demand: "Medium"
    }
  ];

  const marketInsights = [
    {
      title: "Strong Seller's Market Continues",
      description: "Limited inventory and high demand are driving prices up across most neighborhoods",
      impact: "positive",
      icon: TrendingUp
    },
    {
      title: "Luxury Market Heating Up",
      description: "Properties over $1M are seeing increased activity, especially in waterfront areas",
      impact: "positive",
      icon: Award
    },
    {
      title: "First-Time Buyer Challenges",
      description: "Entry-level homes are becoming increasingly competitive with multiple offers common",
      impact: "neutral",
      icon: Users
    },
    {
      title: "Investment Opportunities",
      description: "Rental properties continue to show strong returns with growing rental demand",
      impact: "positive",
      icon: Building2
    }
  ];

  const priceRanges = [
    { range: "$200k - $300k", count: 234, percentage: 18.8 },
    { range: "$300k - $400k", count: 312, percentage: 25.0 },
    { range: "$400k - $500k", count: 298, percentage: 23.9 },
    { range: "$500k - $750k", count: 245, percentage: 19.6 },
    { range: "$750k - $1M", count: 89, percentage: 7.1 },
    { range: "$1M+", count: 69, percentage: 5.6 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-16 md:py-24">
        <div className="container-width">
          <motion.div 
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              St. Petersburg Market Analysis
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
              Stay informed with the latest real estate trends, market statistics, and insights 
              to make confident buying and selling decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={handleContactClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Get Market Report
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                onClick={handleDownloadReport}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Current Market Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time market statistics for St. Petersburg real estate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Median Home Price",
                value: `$${marketData.currentMonth.medianPrice.toLocaleString()}`,
                change: marketData.currentMonth.priceChange,
                icon: DollarSign,
                color: "text-green-600"
              },
              {
                title: "Days on Market",
                value: marketData.currentMonth.avgDaysOnMarket.toString(),
                change: marketData.currentMonth.daysChange,
                icon: Clock,
                color: "text-blue-600"
              },
              {
                title: "Active Inventory",
                value: marketData.currentMonth.inventoryCount.toLocaleString(),
                change: marketData.currentMonth.inventoryChange,
                icon: Home,
                color: "text-purple-600"
              },
              {
                title: "New Listings",
                value: marketData.currentMonth.newListings.toString(),
                change: 0,
                icon: Building2,
                color: "text-orange-600"
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">
                        {stat.title}
                      </h3>
                      <p className="text-2xl font-bold text-slate-gray mb-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(stat.change > 0 ? 'up' : stat.change < 0 ? 'down' : 'neutral')}
                        <span className={`text-sm font-medium ${stat.change > 0 ? 'text-green-600' : stat.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {stat.change > 0 ? '+' : ''}{stat.change}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Market Trends Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-gray">
                    Market Trends Summary
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Prices: <strong>Rising</strong> (+2.4% this month)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Inventory: <strong>Declining</strong> (-12% this month)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Demand: <strong>Strong</strong> (28 days avg)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Detailed Analysis Tabs */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Detailed Market Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore comprehensive market data and insights
            </p>
          </motion.div>

          <Tabs defaultValue="neighborhoods" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Trends</TabsTrigger>
              <TabsTrigger value="insights">Market Insights</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="neighborhoods" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-gray mb-4">
                    Neighborhood Performance
                  </h3>
                  <div className="space-y-4">
                    {neighborhoodData.map((neighborhood, index) => (
                      <motion.div
                        key={neighborhood.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-slate-gray">
                                {neighborhood.name}
                              </h4>
                              <Badge className={getDemandColor(neighborhood.demand)}>
                                {neighborhood.demand} Demand
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Price:</span>
                                <p className="font-semibold">${neighborhood.medianPrice.toLocaleString()}</p>
                                <div className="flex items-center gap-1">
                                  {getTrendIcon(neighborhood.priceChange > 0 ? 'up' : 'down')}
                                  <span className={neighborhood.priceChange > 0 ? 'text-green-600' : 'text-red-600'}>
                                    {neighborhood.priceChange}%
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">Days:</span>
                                <p className="font-semibold">{neighborhood.avgDaysOnMarket}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Inventory:</span>
                                <p className="font-semibold">{neighborhood.inventory}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-gray mb-4">
                    Price Distribution
                  </h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {priceRanges.map((range, index) => (
                          <div key={range.range} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-slate-gray">{range.range}</span>
                              <span className="text-gray-600">{range.count} homes ({range.percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-soft-blue h-2 rounded-full transition-all duration-500"
                                style={{ width: `${range.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Price Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-slate-gray">Median Price</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${marketData.currentMonth.medianPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUp className="w-4 h-4" />
                            <span className="font-semibold">+{marketData.currentMonth.priceChange}%</span>
                          </div>
                          <p className="text-sm text-gray-600">vs last month</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-gray">Price Movement by Range</h4>
                        {[
                          { range: "$200k - $400k", change: 1.8 },
                          { range: "$400k - $600k", change: 2.7 },
                          { range: "$600k - $800k", change: 3.1 },
                          { range: "$800k+", change: 2.3 }
                        ].map((item, index) => (
                          <div key={item.range} className="flex justify-between items-center">
                            <span className="text-gray-700">{item.range}</span>
                            <div className="flex items-center gap-1">
                              {getTrendIcon('up')}
                              <span className="text-green-600 font-medium">+{item.change}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Market Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-slate-gray">Avg Days on Market</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {marketData.currentMonth.avgDaysOnMarket} days
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowDown className="w-4 h-4" />
                            <span className="font-semibold">{Math.abs(marketData.currentMonth.daysChange)} days</span>
                          </div>
                          <p className="text-sm text-gray-600">faster than last month</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-gray">Speed by Price Range</h4>
                        {[
                          { range: "$200k - $400k", days: 25 },
                          { range: "$400k - $600k", days: 28 },
                          { range: "$600k - $800k", days: 35 },
                          { range: "$800k+", days: 45 }
                        ].map((item, index) => (
                          <div key={item.range} className="flex justify-between items-center">
                            <span className="text-gray-700">{item.range}</span>
                            <span className="font-medium text-blue-600">{item.days} days</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              insight.impact === 'positive' ? 'bg-green-100' : 
                              insight.impact === 'negative' ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                insight.impact === 'positive' ? 'text-green-600' : 
                                insight.impact === 'negative' ? 'text-red-600' : 'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-gray mb-2">
                                {insight.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {insight.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      6-Month Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-slate-gray mb-3">Price Predictions</h4>
                        <div className="space-y-3">
                          {[
                            { month: "Next 3 months", prediction: "+3-5%" },
                            { month: "3-6 months", prediction: "+2-4%" },
                            { month: "6+ months", prediction: "+1-3%" }
                          ].map((item, index) => (
                            <div key={item.month} className="flex justify-between items-center">
                              <span className="text-gray-700">{item.month}</span>
                              <span className="font-semibold text-purple-600">{item.prediction}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-gray mb-3">Market Factors</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Continued low inventory levels
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Strong buyer demand from relocations
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Potential interest rate stabilization
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            New construction pipeline
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-600" />
                      Investment Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-slate-gray mb-3">Hot Markets</h4>
                        <div className="space-y-3">
                          {[
                            { area: "Downtown Core", reason: "Tech company growth" },
                            { area: "Waterfront Properties", reason: "Limited supply" },
                            { area: "Historic Districts", reason: "Renovation potential" }
                          ].map((item, index) => (
                            <div key={item.area} className="flex justify-between items-center">
                              <span className="font-medium text-slate-gray">{item.area}</span>
                              <span className="text-sm text-gray-600">{item.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-gray mb-3">Rental Market</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg Rent:</span>
                            <span className="font-semibold">$2,200/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vacancy Rate:</span>
                            <span className="font-semibold text-green-600">3.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rent Growth:</span>
                            <span className="font-semibold text-green-600">+4.1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Your Personalized Market Report
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Receive detailed market analysis for your specific neighborhood and property type. 
              Stay ahead of market trends with our expert insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="w-full bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={handleContactClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Request Report
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-soft-blue px-8 py-4 text-lg"
                onClick={handleDownloadReport}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Full Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-slate-gray mb-6">
              Additional Market Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Property Search",
                  description: "Browse current listings with detailed market data",
                  link: "/properties",
                  icon: Home
                },
                {
                  title: "Neighborhood Guide",
                  description: "Explore St. Petersburg neighborhoods and their market performance",
                  link: "/neighborhoods",
                  icon: MapPin
                },
                {
                  title: "Mortgage Calculator",
                  description: "Calculate payments and see how market changes affect affordability",
                  link: "/mortgage-calculator",
                  icon: Calculator
                }
              ].map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={resource.link}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-ocean-blue transition-colors">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-slate-gray mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {resource.description}
                          </p>
                          <div className="inline-flex items-center text-soft-blue text-sm group-hover:text-ocean-blue transition-colors">
                            Explore
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
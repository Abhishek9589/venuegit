import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { 
  MapPin, 
  Users, 
  Star, 
  Phone, 
  Mail,
  Clock,
  Wifi,
  Car,
  Camera,
  Music,
  Utensils,
  ArrowLeft,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  CheckCircle,
  X
} from 'lucide-react';

// Mock venue data (in a real app, this would come from an API)
const venues = [
  {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Mumbai, Maharashtra",
    capacity: 650,
    price: 50000,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
    ],
    facilities: ["AC", "Parking", "Catering", "Sound System", "Stage", "Lighting", "Security", "Valet"],
    type: "Banquet Hall",
    description: "Elegant banquet hall perfect for weddings and large celebrations with premium amenities. This stunning venue features high ceilings, crystal chandeliers, and can accommodate up to 650 guests comfortably. The hall includes a built-in stage, state-of-the-art sound system, and professional lighting setup.",
    phone: "+91 98765 43210",
    email: "contact@grandballroom.com",
    address: "123 Wedding Street, Bandra West, Mumbai, Maharashtra 400050",
    amenities: [
      { name: "Air Conditioning", icon: "❄️", available: true },
      { name: "Parking", icon: "🚗", available: true },
      { name: "Catering", icon: "🍽️", available: true },
      { name: "Sound System", icon: "🎵", available: true },
      { name: "Stage", icon: "🎭", available: true },
      { name: "Lighting", icon: "💡", available: true },
      { name: "Security", icon: "🛡️", available: true },
      { name: "Valet Parking", icon: "🔑", available: true },
      { name: "WiFi", icon: "📶", available: true },
      { name: "Photography", icon: "📸", available: false },
      { name: "Decoration", icon: "🎨", available: false },
      { name: "DJ", icon: "🎧", available: false }
    ],
    policies: [
      "Advance booking required minimum 30 days",
      "50% advance payment required at booking",
      "Cancellation allowed up to 15 days before event",
      "Outside catering not allowed",
      "Decoration setup allowed 2 hours before event",
      "Event must end by 11 PM",
      "Maximum capacity strictly enforced",
      "Smoking not allowed inside the venue"
    ],
    priceIncludes: [
      "Basic lighting setup",
      "Sound system with microphones",
      "Air conditioning",
      "Basic security",
      "Cleaning service",
      "Parking for 100 vehicles"
    ],
    additionalCharges: [
      { item: "Extra hour beyond 11 PM", charge: "₹5,000 per hour" },
      { item: "Additional decoration", charge: "₹15,000 - ₹50,000" },
      { item: "Photography service", charge: "₹25,000 - ₹75,000" },
      { item: "Additional security", charge: "₹2,000 per guard" }
    ]
  },
  {
    id: 2,
    name: "Royal Garden Resort",
    location: "Delhi, NCR",
    capacity: 300,
    price: 35000,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop"
    ],
    facilities: ["Garden", "Pool", "Parking", "Decoration", "Catering"],
    type: "Resort",
    description: "Beautiful garden resort with outdoor spaces and luxury amenities for memorable events.",
    phone: "+91 98765 43211",
    email: "contact@royalgarden.com",
    address: "456 Garden Road, Gurgaon, Delhi NCR 122001"
  }
];

export default function VenueDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAllImages, setShowAllImages] = useState(false);

  const venue = venues.find(v => v.id === parseInt(id || ''));

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Venue Not Found</h2>
          <p className="text-gray-500 mb-6">The venue you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/venues">Browse All Venues</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-venue-indigo hover:text-venue-purple">
            <Link to="/venues">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Venues
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-video w-full">
                  <img
                    src={venue.images?.[selectedImage] || venue.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop"}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-venue-indigo text-white">
                    {venue.type}
                  </Badge>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {venue.images && venue.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {venue.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-venue-indigo' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${venue.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Venue Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-venue-dark mb-2">{venue.name}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">Up to {venue.capacity} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({venue.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-venue-indigo">₹{venue.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Venue</h3>
                  <p className="text-gray-600 leading-relaxed">{venue.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities & Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{amenity.icon}</span>
                      <span className={`text-sm ${amenity.available ? 'text-gray-700' : 'text-gray-400'}`}>
                        {amenity.name}
                      </span>
                      {amenity.available ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  )) || (
                    <div className="col-span-full">
                      <div className="flex flex-wrap gap-2">
                        {venue.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Details */}
            {venue.priceIncludes && (
              <Card>
                <CardHeader>
                  <CardTitle>What's Included in the Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {venue.priceIncludes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {venue.additionalCharges && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Additional Charges</h4>
                      <div className="space-y-2">
                        {venue.additionalCharges.map((charge, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{charge.item}</span>
                            <span className="font-medium">{charge.charge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Policies */}
            {venue.policies && (
              <Card>
                <CardHeader>
                  <CardTitle>Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {venue.policies.map((policy, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-venue-indigo">•</span>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Booking Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Book This Venue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Select Date
                    </label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price</span>
                      <span>₹{venue.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fee</span>
                      <span>₹{(venue.price * 0.1).toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{(venue.price * 1.1).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-venue-indigo hover:bg-venue-purple text-white">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Venue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-venue-indigo" />
                    <div>
                      <div className="font-medium">{venue.phone}</div>
                      <div className="text-sm text-gray-500">Call for details</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-venue-indigo" />
                    <div>
                      <div className="font-medium">{venue.email}</div>
                      <div className="text-sm text-gray-500">Send inquiry</div>
                    </div>
                  </div>
                  {venue.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-venue-indigo mt-1" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-gray-500">{venue.address}</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-venue-indigo hover:bg-venue-purple">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Venues */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Venues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {venues.filter(v => v.id !== venue.id).slice(0, 2).map((similarVenue) => (
                      <Link key={similarVenue.id} to={`/venue/${similarVenue.id}`}>
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <img
                            src={similarVenue.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=100&h=80&fit=crop"}
                            alt={similarVenue.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{similarVenue.name}</h4>
                            <p className="text-xs text-gray-500">{similarVenue.location}</p>
                            <p className="text-sm font-medium text-venue-indigo">₹{similarVenue.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

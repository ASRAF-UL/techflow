import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Badge,
  Check,
  Crown,
  Gem,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Stripe setup (can be left as-is for later integration)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const dummyPlans = [
  {
    id: "plan_free",
    name: "Free",
    price: 0,
    features: JSON.stringify([
      "Access to limited templates",
      "Basic export options",
      "Community support",
    ]),
  },
  {
    id: "plan_basic",
    name: "Basic",
    price: 9,
    features: JSON.stringify([
      "Access to all templates",
      "Standard export formats",
      "Email support",
    ]),
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: 29,
    features: JSON.stringify([
      "Everything in Basic",
      "Priority support",
      "Advanced AI features",
      "Custom branding",
    ]),
  },
];

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetch delay
    const timeout = setTimeout(() => {
      setPlans(dummyPlans);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubscribe = async (planId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSelectedPlan(planId);
    setProcessingPayment(true);

    // Just simulate a fake subscription for testing
    setTimeout(() => {
      alert(`Subscribed to plan: ${planId}`);
      navigate("/account?subscription=success");
      setProcessingPayment(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select the plan that fits your needs and start generating documents
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-xl border ${
                plan.name.toLowerCase() === "pro"
                  ? "ring-2 ring-blue-500 border-transparent"
                  : "border-gray-200"
              }`}
            >
              {plan.name.toLowerCase() === "pro" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                  POPULAR
                </div>
              )}

              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  {plan.name.toLowerCase() === "free" && (
                    <Gem className="h-5 w-5 text-gray-400" />
                  )}
                  {plan.name.toLowerCase() === "basic" && (
                    <Zap className="h-5 w-5 text-blue-400" />
                  )}
                  {plan.name.toLowerCase() === "pro" && (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {JSON.parse(plan.features).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="ml-2 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={processingPayment && selectedPlan === plan.id}
                  className={`w-full flex justify-center items-center px-4 py-2 text-white font-semibold rounded-md ${
                    plan.name.toLowerCase() === "pro"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {processingPayment && selectedPlan === plan.id ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 mr-2" />
                  )}
                  {plan.name.toLowerCase() === "free"
                    ? "Get Started"
                    : "Subscribe"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;

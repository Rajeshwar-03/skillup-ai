import { motion } from "framer-motion";
import { MessageSquare, Mic, Speaker, Globe } from "lucide-react";
import { useState } from "react";

export const AIChat = () => {
  const [message, setMessage] = useState("");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">AI Learning Assistant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant help with your learning journey through our AI-powered chatbot
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 glass rounded-xl p-4">
                    <p>Hello! How can I help you with your learning journey today?</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="p-2 rounded-xl glass hover:bg-white/20 transition-colors">
                  <Mic className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="p-2 rounded-xl glass hover:bg-white/20 transition-colors">
                  <Speaker className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-xl glass hover:bg-white/20 transition-colors">
                  <Globe className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
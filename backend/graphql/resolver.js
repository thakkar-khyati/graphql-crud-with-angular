const Quote = require("../models/quote");

module.exports = {
  quotes: async () => {
    const quotes = await Quote.find();
    return {
      quotes: quotes.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },
  createQuote: async ({ quoteInput }) => {
    const quote = new Quote({
      quote: quoteInput.quote,
      author: quoteInput.author,
    });
    await quote.save();
    return {
      ...quote._doc,
      _id: quote._id.toString(),
    };
  },
  updateQuote: async ({ id, quoteInput }) => {
    const quote = await Quote.findById(id);
    if (!quote) {
      throw new Error("quote not found!");
    }
    if (quoteInput.quote !== undefined) {
      quote.quote = quoteInput.quote;
    }
    if (quoteInput.author !== undefined) {
      quote.author = quoteInput.author;
    }
    await quote.save();
    return {
      ...quote._doc,
      _id: quote._id.toString(),
    };
  },
  deleteQuote: async ({ id }) => {
    const quote = await Quote.findById(id);
    if (!quote) {
      throw new Error("quote not found");
    }
    await Quote.findByIdAndRemove(id);
    return {
      ...quote._doc,
      _id: quote._id.toString(),
    };
  },
};

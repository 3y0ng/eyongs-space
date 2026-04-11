const words = [
  "founder", "builder", "thinker", "maker", "dreamer",
  "designer", "writer", "explorer", "optimist", "doer",
];

const Marquee = () => {
  const repeated = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((word, i) => (
          <span key={i} className="mx-6 text-lg font-medium text-muted-foreground uppercase tracking-widest">
            {word} <span className="text-primary mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

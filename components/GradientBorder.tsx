// GradientBorder.tsx
// Citations: The following is of the courtesy of ChatGPT
interface GradientBorderProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const GradientBorder = ({ children, className = '' }: GradientBorderProps) => {
    return (
      <div className={`relative p-1 bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] ${className}`}>
        {children}
      </div>
    );
  };
  
  export default GradientBorder;
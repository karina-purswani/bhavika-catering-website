import React, { useEffect, useRef } from 'react';

interface GoogleReviewsWidgetProps {
  embedCode: string;
}

export const GoogleReviewsWidget: React.FC<GoogleReviewsWidgetProps> = ({ embedCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !embedCode) return;

    // Clear previous contents
    containerRef.current.innerHTML = '';

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = embedCode;

    // Append non-script elements
    const children = Array.from(tempDiv.childNodes);
    children.forEach((node) => {
      if (node.nodeName !== 'SCRIPT') {
        containerRef.current?.appendChild(node.cloneNode(true));
      }
    });

    // Extract and load script elements dynamically
    const scripts = tempDiv.getElementsByTagName('script');
    const loadedScripts: HTMLScriptElement[] = [];

    Array.from(scripts).forEach((script) => {
      const newScript = document.createElement('script');
      
      // Copy all attributes
      Array.from(script.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      if (script.innerHTML) {
        newScript.innerHTML = script.innerHTML;
      }
      
      loadedScripts.push(newScript);
      document.body.appendChild(newScript);
    });

    // Cleanup scripts on unmount
    return () => {
      loadedScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [embedCode]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[350px] flex justify-center items-center transition-all duration-300" 
    />
  );
};

export default GoogleReviewsWidget;

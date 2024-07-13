import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PreviewPage = () => {
  const router = useRouter();
  const { templateHTML } = router.query;
  const [decodedHTML, setDecodedHTML] = useState('');

  useEffect(() => {
    if (templateHTML) {
      setDecodedHTML(decodeURIComponent(templateHTML));
    }
  }, [templateHTML]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {decodedHTML ? (
        <div dangerouslySetInnerHTML={{ __html: decodedHTML }} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default PreviewPage;

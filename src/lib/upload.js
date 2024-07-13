  export async function upload(ev, callbackfn) {
    const file = ev.target.files?.[0];
  
    if (file) {
      try {
        const data = new FormData();
        data.set("file", file);
  
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
  
        const link = await response.json();
        callbackfn(link);
        return Response.json(link);
      } catch (error) {
        throw error;
      }
    }
  }
  
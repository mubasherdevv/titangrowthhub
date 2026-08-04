import BlogPostEditor from '@/components/BlogPostEditor';

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  return <BlogPostEditor postId={params.id} />;
}

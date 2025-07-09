import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CategorySelect = styled.select`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  min-width: 150px;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
`;

const AddPostButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255,107,107,0.3);
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
  min-height: 200px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(45deg, #667eea, #764ba2)'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const CategoryTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.9);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 1rem;
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  color: #666;
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(78,205,196,0.3);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4ecdc4;
    box-shadow: 0 0 0 3px rgba(78,205,196,0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4ecdc4;
    box-shadow: 0 0 0 3px rgba(78,205,196,0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(78,205,196,0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f0f0f0;
  color: #666;

  &:hover {
    background: #e0e0e0;
  }
`;

const DeleteButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff5252;
    transform: translateY(-1px);
  }
`;

const GymFitBlog = () => {
  // Initialize posts with default data that persists
  const getInitialPosts = () => {
    const defaultPosts = [
      {
        id: 1,
        title: "5 Essential Compound Movements for Maximum Muscle Growth",
        excerpt: "Discover the most effective compound exercises that target multiple muscle groups and accelerate your fitness journey.",
        content: "Learn about deadlifts, squats, bench press, pull-ups, and overhead press to build maximum muscle efficiently. These compound movements work multiple muscle groups simultaneously, making them incredibly efficient for building strength and muscle mass. The deadlift targets your entire posterior chain, while squats work your legs and core. Bench press develops chest, shoulders, and triceps, pull-ups strengthen your back and biceps, and overhead press builds shoulder and core stability.",
        category: "strength",
        author: "Mike Johnson",
        date: "2024-07-05",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop",
        tags: ["compound", "strength", "muscle-building"]
      },
      {
        id: 2,
        title: "HIIT vs Steady State: Which Burns More Fat?",
        excerpt: "An in-depth comparison of high-intensity interval training versus traditional steady-state cardio for fat loss.",
        content: "Explore the science behind different cardio methods and find the best approach for your fat loss goals. HIIT involves short bursts of intense exercise followed by recovery periods, while steady-state cardio maintains a consistent moderate intensity. Research shows HIIT can burn more calories in less time and continues burning calories after the workout (EPOC effect). However, steady-state cardio is easier to recover from and can be done more frequently. The best approach depends on your fitness level, time constraints, and personal preferences.",
        category: "cardio",
        author: "Sarah Chen",
        date: "2024-07-03",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop",
        tags: ["hiit", "cardio", "fat-loss"]
      },
      {
        id: 3,
        title: "Pre and Post Workout Nutrition: Fuel Your Performance",
        excerpt: "Optimize your workout results with proper nutrition timing and food choices before and after training.",
        content: "Understanding macronutrients and meal timing can significantly impact your workout performance and recovery. Pre-workout nutrition should focus on easily digestible carbohydrates and moderate protein 1-2 hours before training. Post-workout, aim for a combination of protein and carbohydrates within 30-60 minutes to optimize recovery and muscle protein synthesis. Hydration is equally important - drink water before, during, and after your workout to maintain performance and aid recovery.",
        category: "nutrition",
        author: "Dr. Amanda Rivera",
        date: "2024-07-01",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=240&fit=crop",
        tags: ["nutrition", "performance", "recovery"]
      },
      {
        id: 4,
        title: "Building Mental Resilience Through Fitness",
        excerpt: "How regular exercise can strengthen your mental health and build psychological resilience.",
        content: "The connection between physical and mental strength is undeniable. Regular exercise releases endorphins, reduces stress hormones, and improves sleep quality. It also provides a sense of accomplishment and builds discipline that carries over into other areas of life. Set realistic goals, celebrate small victories, and remember that consistency is more important than perfection. Use fitness as a tool for mental health maintenance and stress management.",
        category: "mindset",
        author: "Coach Lisa Park",
        date: "2024-06-28",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1506629905607-d9f7ccb14e8e?w=400&h=240&fit=crop",
        tags: ["mindset", "mental-health", "resilience"]
      }
    ];
    return defaultPosts;
  };

  const [posts, setPosts] = useState(getInitialPosts());

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'strength',
    author: '',
    image: '',
    tags: ''
  });

  const categories = ['all', 'strength', 'cardio', 'nutrition', 'mindset', 'recovery'];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const handleAddPost = () => {
    if (formData.title && formData.excerpt && formData.content && formData.author) {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setPosts([newPost, ...posts]);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'strength',
        author: '',
        image: '',
        tags: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleResetPosts = () => {
    setPosts(getInitialPosts());
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  return (
    <BlogContainer>
      <Header>
        <Title>GymFit Blog</Title>
        <Subtitle>
          Your ultimate destination for fitness tips, workout routines, and wellness insights
        </Subtitle>
      </Header>

      <ControlsContainer>
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterContainer>
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </CategorySelect>

          <AddPostButton onClick={() => setShowAddModal(true)}>
            ➕ Add Post
          </AddPostButton>

          <AddPostButton 
            onClick={handleResetPosts}
            style={{ background: 'linear-gradient(45deg, #4ecdc4, #44a08d)' }}
          >
            🔄 Reset Posts
          </AddPostButton>
        </FilterContainer>
      </ControlsContainer>

      {filteredPosts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#666',
          fontSize: '1.2rem'
        }}>
          {searchTerm || selectedCategory !== 'all' ? 
            'No posts found matching your criteria.' : 
            'No blog posts yet. Click "Add Post" to create your first article!'
          }
        </div>
      ) : (
        <BlogGrid>
          {filteredPosts.map(post => (
            <BlogCard key={post.id}>
              <BlogImage image={post.image}>
                <CategoryTag>{post.category}</CategoryTag>
              </BlogImage>
              <BlogContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <span>👤 {post.author}</span>
                  <span>📅 {post.date}</span>
                  <span>⏱️ {post.readTime}</span>
                </BlogMeta>
                <BlogTags>
                  {post.tags && post.tags.map(tag => (
                    <Tag key={tag}>#{tag}</Tag>
                  ))}
                </BlogTags>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <ReadMoreButton onClick={() => openPost(post)}>
                    Read More →
                  </ReadMoreButton>
                  <DeleteButton onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </DeleteButton>
                </div>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      )}

      {showAddModal && (
        <Modal>
          <ModalContent>
            <h2>Add New Blog Post</h2>
            <FormGroup>
              <Label>Title *</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
              />
            </FormGroup>
            <FormGroup>
              <Label>Excerpt *</Label>
              <TextArea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of the post"
              />
            </FormGroup>
            <FormGroup>
              <Label>Content *</Label>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Full article content"
                style={{ minHeight: '150px' }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Category *</Label>
              <CategorySelect
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.filter(cat => cat !== 'all').map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </CategorySelect>
            </FormGroup>
            <FormGroup>
              <Label>Author *</Label>
              <Input
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Image URL</Label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>
            <FormGroup>
              <Label>Tags (comma-separated)</Label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="fitness, workout, health"
              />
            </FormGroup>
            <ButtonGroup>
              <SecondaryButton onClick={() => setShowAddModal(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleAddPost}>
                Add Post
              </PrimaryButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {showPostModal && selectedPost && (
        <Modal>
          <ModalContent>
            <h2>{selectedPost.title}</h2>
            <BlogMeta style={{ marginBottom: '1rem' }}>
              <span>👤 {selectedPost.author}</span>
              <span>📅 {selectedPost.date}</span>
              <span>⏱️ {selectedPost.readTime}</span>
            </BlogMeta>
            <BlogTags style={{ marginBottom: '1rem' }}>
              {selectedPost.tags.map(tag => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </BlogTags>
            <p style={{ lineHeight: '1.6', color: '#333' }}>
              {selectedPost.content}
            </p>
            <ButtonGroup>
              <SecondaryButton onClick={() => setShowPostModal(false)}>
                Close
              </SecondaryButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </BlogContainer>
  );
};

export default GymFitBlog;
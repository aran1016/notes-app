import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteDetailPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = async () => {

        if(!window.confirm("Are you sure you want to delete this note?")) return;
        
        try {
            await api.delete(`/notes/${id}`);
            navigate("/");
            toast.success("Note deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete note");
            console.log("Error deleting note:", error);
        }
    }

      useEffect(() => {
    const fetchNote = async () => {
        try {
            const res = await api.get(`/notes/${id}`);
            console.log(res.data);
            setTitle(res.data.title);
            setContent(res.data.content);
        } catch (error) {
            console.log("Error fetching note1:");
        }
        finally {
            setLoading(false);
        }
    };

    fetchNote();
  }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await api.put(`/notes/${id}`, { title, content });
            navigate("/");
            toast.success("Note updated successfully!");
        } catch (error) {
            toast.error("Failed to update note");
            console.log("Error updating note:", error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <Link to={"/"} className='btn btn-ghost mb-6'>
                    <ArrowLeftIcon className='size-5'></ArrowLeftIcon>
                    Back to Notes
                </Link>
                <div className='card-actions justify-end'>
                    <button className="btn bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={handleDelete}>
                        <Trash2Icon className='size-4 text-red' />
                        Delete Note
                    </button>
                </div>
                
                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl md-4'>Edit Note</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Title</span>
                                </label>
                                <input type='text'
                                    placeholder='Note Title'
                                    className='input input-bordered'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Content</span>
                                </label>
                                <textarea
                                    placeholder={title}
                                    className='textarea textarea-bordered h-32'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className='card-actions justify-end'>
                                <button type='submit' className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default NoteDetailPage
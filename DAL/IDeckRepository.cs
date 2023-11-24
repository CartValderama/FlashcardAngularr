using FlashcardProject.Models;

namespace FlashcardProject.DAL
{
    public interface IDeckRepository
    {
        // entity retrieval 
        Task<IEnumerable<Deck>?> GetAll();
        Task<Deck?> GetDeckById(int deckid);
        Task<IEnumerable<Deck>?> GetDecksByFolderId(int folderId);

        // CRUD-operations
        Task<bool> Create(Deck deck);
        Task<bool> Update(Deck deck);
        Task<bool> Delete(int deckid);
    }
}

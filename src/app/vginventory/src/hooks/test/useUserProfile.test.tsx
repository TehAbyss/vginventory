import { useUserProfile } from '../useUserProfile';
import { renderHook, act } from '@testing-library/react-hooks';
import { getEmptyVideoGameListMock, getUserProfileMock } from '../../models/mocks/mockUserProfile';

describe('useUserProfile hook', () => {
  it('takes in a user with an empty video game list', () => {
    const { result } = renderHook (() => useUserProfile(getEmptyVideoGameListMock()));
    expect(result.current.videoGames.videoGames.length).toBe(0);
  });

  it('takes in a user with a video game listof 2 video games', () => {
    const { result } = renderHook (() => useUserProfile(getUserProfileMock()));
    expect(result.current.videoGames.videoGames.length).toBe(2);
  });

  it('updates the user bio', () => {
    const { result } = renderHook (() => useUserProfile(getUserProfileMock()));
    let expected = result.current.user.bio;
    expected = expected.concat('And I enjoy RPGs!');
    act(() => {
      result.current.setUserBio(expected);
    });

    expect(result.current.userBio).toBe(expected);
  });

  /*it('add a videogame to the current list of games', () => {
    const { result } = renderHook (() => useUserProfile(getUserProfileMock()));
    
    act(() => {
      result.current.addVideoGameToList('Xenoblade');
    });

    expect(result.current.videoGames.length).toBe(3);
  });
  */
});
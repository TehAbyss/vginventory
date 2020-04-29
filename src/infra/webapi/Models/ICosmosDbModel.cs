using System;

namespace VgInventory.Infra.WebApi.Models
{
    public interface ICosmosDbModel {
        string GetContainerId();
        string GetId();
        string GetPartitionKeyPath();
    }
}

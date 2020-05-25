using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Attack_Cone : MonoBehaviour
{
    public TurretAI turretAI;

    public bool isLeft = false;

    private void Awake()
    {
        turretAI = gameObject.GetComponentInParent<TurretAI>();
    }

    private void OnTriggerStay2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            if (isLeft)
            {
                turretAI.Attack(false);
            }
            else
            {
                turretAI.Attack(true);
            }
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
